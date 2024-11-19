from django.http import JsonResponse
from django.views import View
from .models import *
from .serializers import *


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
        if "volee" in params:
            volee = Volee.objects.filter(id=int(params["volee"]))
        else:
            volee = Volee.objects.all().order_by('-date_fin')
        volee_data = VoleeSerializer(volee, many=True).data
        return JsonResponse(volee_data, safe=False)


class EleveView(View):
    def get(self, request):
        params = request.GET
        type = params.get("type", "")
        if "top" in type:
            try:
                nb = int(type[3:])
            except Exception:
                nb = 3
            eleves = Eleve.objects.order_by('-elo')[:nb]
        else:
            eleves = Eleve.objects.order_by('nom', 'prenom')
        eleves_data = EleveSerializer(eleves, many=True).data
        return JsonResponse(eleves_data, safe=False)
