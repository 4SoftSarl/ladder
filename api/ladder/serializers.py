from rest_framework import serializers
from .models import *


class EleveSerializer(serializers.ModelSerializer):
    current_rank = serializers.SerializerMethodField("get_current_rank")

    class Meta:
        model = Eleve
        fields = "__all__"

    def get_current_rank(self, instance):
        rank = Ranking.objects.get(elo_min__lte=instance.elo, elo_max__gt=instance.elo)
        return RankingSerializer(rank, many=False).data


class VoleeSerializer(serializers.ModelSerializer):
    date_debut = serializers.DateField(format="%d-%m-%Y")
    date_fin = serializers.DateField(format="%d-%m-%Y")
    eleves = serializers.SerializerMethodField("get_eleves")

    class Meta:
        model = Volee
        fields = "__all__"

    def get_eleves(self, instance):
        eleves = instance.eleves.order_by("-elo", "nom", "prenom")
        return EleveSerializer(eleves, many=True).data


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
    

class ExamenSerializer(serializers.ModelSerializer):
    date_creation = serializers.DateField(format="%d-%m-%Y")
    date_rendu = serializers.DateField(format="%d-%m-%Y")
    sous_categorie = SousCategorieSerializer(many=False)

    class Meta:
        model = Examen
        fields = "__all__"


class ExamenResultatSerializer(serializers.ModelSerializer):
    examen = ExamenSerializer(many=False)
    eleve = EleveSerializer(many=False)
    date_rendu = serializers.DateField(format="%d-%m-%Y")

    class Meta:
        model = ExamenResultat
        fields = "__all__"
