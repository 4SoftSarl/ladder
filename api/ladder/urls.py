from django.urls import path
from . import views

urlpatterns = [
    path('ladder/volee', views.VoleeView.as_view()),
    path('ladder/ranking', views.RankingView.as_view()),
    path('ladder/ladder', views.LadderView.as_view()),
    path('ladder/eleve', views.EleveView.as_view()),
]