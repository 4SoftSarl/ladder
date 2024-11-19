from django.db import models

class Volee(models.Model):
    label = models.CharField(max_length=50)
    date_debut = models.DateField()
    date_fin = models.DateField()

    def __str__(self):
        return self.label
    

class Ranking(models.Model):
    label = models.CharField(max_length=50)
    elo_min = models.IntegerField()
    elo_max = models.IntegerField()
    image = models.ImageField(upload_to="ranking/")
    color = models.CharField(max_length=10, default="#ffffff")

    def __str__(self):
        return self.label
    

class Eleve(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    elo = models.IntegerField()
    volee = models.ForeignKey(Volee, on_delete=models.PROTECT, related_name="eleves")

    def __str__(self):
        return self.nom + " " + self.prenom


class Categorie(models.Model):
    label = models.CharField(max_length=50)

    def __str__(self):
        return self.label


class SousCategorie(models.Model):
    label = models.CharField(max_length=50)
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)

    def __str__(self):
        return self.label


class Examen(models.Model):
    label = models.CharField(max_length=50)
    date_creation = models.DateField(auto_now_add=True)
    date_rendu = models.DateField()
    description = models.TextField()
    elo_max = models.IntegerField()
    sous_categorie = models.ForeignKey(SousCategorie, on_delete=models.PROTECT)

    def __str__(self):
        return self.label
    

class ExamenResultat(models.Model):
    date_rendu = models.DateField()
    examen = models.ForeignKey(Examen, on_delete=models.PROTECT)
    elo = models.IntegerField()
    eleve = models.ForeignKey(Eleve, on_delete=models.PROTECT)

    def __str__(self):
        return f"Résultat de {str(self.eleve)} pour l'examen {str(self.examen)}"
