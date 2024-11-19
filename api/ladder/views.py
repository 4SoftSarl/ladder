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
