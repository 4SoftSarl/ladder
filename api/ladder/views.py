from datetime import datetime as dt

from django.http import JsonResponse
from django.views import View
from .models import *
from .serializers import *
from .utils import *

class VoleeView(View):
    def get(self, request):
        volees = Volee.objects.all()
        volees_data = VoleeSerializer(volees, many=True).data
        return JsonResponse(volees_data, safe=False)
    

class RankingView(View):
    def get(self, request):
        rankings = Ranking.objects.all()
        rankings_data = RankingSerializer(rankings, many=True).data
        return JsonResponse(rankings_data, safe=False)
    

class LadderView(View):
    def get(self, request):
        params = request.GET
        response = {}
        if "volee" in params:
            ### Average Elo
            volee_id = int(params["volee"])
            ers = ExamenResultat.objects.filter(eleve__volee_id=volee_id).order_by("examen__dt_fin")
            ex_ids = []
            for er in ers:
                if er.examen.id not in ex_ids:
                    ex_ids.append(er.examen.id)
            data = {
                "labels": [],
                "data": []
            }
            for index, ex_id in enumerate(ex_ids):
                ers = ExamenResultat.objects.filter(examen_id=ex_id)
                sum = 0
                for er in ers:
                    sum += er.elo
                data["labels"].append(dt.strftime(ers[0].examen.dt_fin, "%d-%m-%Y"))
                data["data"].append(sum/len(ers))
                if index != 0:
                    data["data"][-1] += data["data"][-2]
            response["average_elo"] = data
            
            ### Pompes
            eleves = Eleve.objects.filter(volee_id=volee_id)
            data_pushups = {
                "total": 0,
                "top": 0,
                "top_name": ""
            }
            for eleve in eleves:
                pushups = Pushup.objects.filter(eleve=eleve)
                sum = 0
                for pushup in pushups:
                    sum += pushup.categorie.quantite
                data_pushups["total"] += sum
                if sum > data_pushups["top"]:
                    data_pushups["top"] = sum
                    data_pushups["top_name"] = eleve.pseudo
                eleve.pushup = sum
                eleve.save()
            response["pushups"] = data_pushups
        return JsonResponse(response, safe=False)


class EleveView(View):
    def get(self, request):
        params = request.GET
        type = params.get("type", "")
        volee = params.get("volee", "")
        id = params.get("id", "")
        if "top" in type:
            try:
                nb = int(type[3:])
            except Exception:
                nb = 3
            eleves = Eleve.objects.order_by('-elo', 'prenom')[:nb]
        elif volee:
            try:
                volee = Volee.objects.get(id=int(volee))
            except Exception:
                volee = Volee.objects.first()
            eleves = Eleve.objects.filter(volee=volee).order_by('-elo', 'prenom')
        elif id:
            try:
                eleve = Eleve.objects.get(id=int(id))
                ers = ExamenResultat.objects.filter(eleve=eleve).order_by("date_rendu")
            except Exception:
                return JsonResponse({"error": "Eleve not found"}, 500, safe=False)
            ers_data = ExamenResultatSerializer(ers, many=True).data
            eleve_data = EleveSerializer(eleve, many=False).data
            elo_list = [
                {
                    "current_elo": 0,
                    "delta_elo": 0,
                    # Enlever une semaine is len != 0
                    "date": ers_data[0]["date_rendu"] if len(ers_data) > 0 else get_date_now_formatted()
                }
            ]
            for er in ers_data:
                elo_list.append({
                    "current_elo": elo_list[-1]["current_elo"] + er["elo"],
                    "delta_elo": er["elo"],
                    "date": er["date_rendu"]
                })
            data = {
                "eleve": eleve_data,
                "eleve_res": ers_data,
                "elo_list": elo_list
            }
            return JsonResponse(data, safe=False)
        else:
            eleves = Eleve.objects.order_by('-elo', 'prenom')
        eleves_data = EleveSerializer(eleves, many=True).data
        return JsonResponse(eleves_data, safe=False)
    

class ExamenView(View):
    def get(self, request):
        params = request.GET
        volee_id = int(params.get("volee", 0))
        if volee_id == 0:
            return JsonResponse({"error": "error"}, safe=False)
        volee = Volee.objects.get(id=volee_id)
        first_eleve = Eleve.objects.filter(volee=volee).first()
        ex_res_fe = ExamenResultat.objects.filter(eleve=first_eleve)
        ex_res_ids = [ex_res.id for ex_res in ex_res_fe]
        examens = Examen.objects.filter(id__in=ex_res_ids).order_by("-dt_debut")
        examens_data = ExamenSerializer(examens, many=True).data
        return JsonResponse(examens_data, safe=False)

    

class AdminView(View):
    def get(self, request):
        # data = json.loads(request.body)
        # check creds
        eleves = Eleve.objects.all()
        for eleve in eleves:
            new_elo = 0
            for ex_res in ExamenResultat.objects.filter(eleve=eleve):
                new_elo += ex_res.elo
            eleve.elo = new_elo
            eleve.save()
        return JsonResponse({"success": True}, safe=False)
    

class BaseView(View):
    def get(self, request):
        categories = Categorie.objects.all()
        sous_categories = SousCategorie.objects.all()
        difficultes = ExamenDifficulte.objects.all()
        ranks = Ranking.objects.all()
        data = {
            "categories": CategorieSerializer(categories, many=True).data,
            "sousCategories": SousCategorieSerializer(sous_categories, many=True).data,
            "difficultes": ExamenDifficulteSerializer(difficultes, many=True).data,
            "ranks": RankingSerializer(ranks, many=True).data
        }
        return JsonResponse(data, safe=False)