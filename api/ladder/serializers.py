from rest_framework import serializers
from .models import *
from .utils import get_delta_rank_name


class EleveSerializer(serializers.ModelSerializer):
    current_rank = serializers.SerializerMethodField("get_current_rank")
    volee_nom = serializers.SerializerMethodField("get_volee_nom")

    class Meta:
        model = Eleve
        fields = "__all__"

    def get_current_rank(self, instance):
        rank = Ranking.objects.get(elo_min__lte=instance.elo, elo_max__gt=instance.elo)
        rank_data = RankingSerializer(rank, many=False).data
        rank_data["rank_name"] = get_delta_rank_name(rank, instance.elo)
        return rank_data
    
    def get_volee_nom(self, instance):
        return instance.volee.label


class VoleeSerializer(serializers.ModelSerializer):
    date_debut = serializers.DateField(format="%d-%m-%Y")
    date_fin = serializers.DateField(format="%d-%m-%Y")
    eleves = serializers.SerializerMethodField("get_eleves")
    label = serializers.SerializerMethodField("get_label")

    class Meta:
        model = Volee
        fields = "__all__"

    def get_eleves(self, instance):
        eleves = instance.eleves.order_by("-elo", "nom", "prenom")
        return EleveSerializer(eleves, many=True).data
    

    def get_label(self, instance):
        return f"{instance.label} • {instance.date_debut.strftime('%Y')} - {instance.date_fin.strftime('%Y')}"


class RankingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ranking
        fields = "__all__"



class CategorieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categorie
        fields = "__all__"

    
class SousCategorieSerializer(serializers.ModelSerializer):
    categorie = serializers.SerializerMethodField("get_categorie")
    categorie_id = serializers.SerializerMethodField("get_categorie_id")

    class Meta:
        model = SousCategorie
        fields = "__all__"

    def get_categorie(self, instance):
        return instance.categorie.label
    
    def get_categorie_id(self, instance):
        return instance.categorie.id
    

class ExamenDifficulteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamenDifficulte
        fields = "__all__"
    

class ExamenSerializer(serializers.ModelSerializer):
    dt_debut = serializers.DateTimeField(format="%d-%m-%Y %H:%M")
    dt_fin = serializers.DateTimeField(format="%d-%m-%Y %H:%M")
    dt_delta = serializers.SerializerMethodField("get_dt_delta")
    difficulte = ExamenDifficulteSerializer(many=False)
    sous_categorie = SousCategorieSerializer(many=False)

    class Meta:
        model = Examen
        fields = "__all__"

    def get_dt_delta(self, instance):
        return "kekw"


class ExamenResultatSerializer(serializers.ModelSerializer):
    eleve = EleveSerializer(many=False)
    date_rendu = serializers.DateField(format="%d-%m-%Y")
    examen = ExamenSerializer(many=False)

    class Meta:
        model = ExamenResultat
        fields = ("id", "date_rendu", "elo", "eleve", "examen")
