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
    pseudo = models.CharField(max_length=50, default="")
    email = models.CharField(max_length=50)
    elo = models.IntegerField()
    pushup = models.IntegerField(default=0)
    volee = models.ForeignKey(Volee, on_delete=models.PROTECT, related_name="eleves")
    image = models.ImageField(upload_to="eleve/", null=True, blank=True, default=None)

    def __str__(self):
        return self.nom + " " + self.prenom


class Categorie(models.Model):
    label = models.CharField(max_length=50)

    def __str__(self):
        return self.label


class SousCategorie(models.Model):
    label = models.CharField(max_length=50)
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE, related_name="sous_categories")
    image = models.ImageField(upload_to="sous_categorie/", null=True, blank=True, default=None)

    def __str__(self):
        return self.label
    

class ExamenDifficulte(models.Model):
    label = models.CharField(max_length=50)
    elo = models.IntegerField()
    color = models.CharField(max_length=20, default="#ffffff")
    image = models.ImageField(upload_to="examen_difficulte/", null=True, blank=True, default=None)

    def __str__(self):
        return self.label

class Examen(models.Model):
    titre = models.CharField(max_length=50, default="")
    description = models.CharField(max_length=200, default="")
    texte = models.TextField(default="")
    dt_debut = models.DateTimeField(null=True, blank=True, default=None)
    dt_fin = models.DateTimeField(null=True, blank=True, default=None)
    difficulte = models.ForeignKey(ExamenDifficulte, null=True, blank=True, default=None, on_delete=models.PROTECT, related_name="examens")
    sous_categorie = models.ForeignKey(SousCategorie, null=True, blank=True, default=None, on_delete=models.PROTECT, related_name="examens")
    fichier = models.FileField(upload_to="examen/", null=True, blank=True, default=None)
    volee = models.ForeignKey(Volee, null=True, blank=True, default=None, on_delete=models.PROTECT, related_name="examens")

    def __str__(self):
        return self.titre
    

class ExamenResultat(models.Model):
    date_rendu = models.DateField()
    examen = models.ForeignKey(Examen, on_delete=models.PROTECT, related_name="examen_resultats")
    elo = models.IntegerField()
    eleve = models.ForeignKey(Eleve, on_delete=models.PROTECT, related_name="examen_resultats")

    def __str__(self):
        return f"Résultat de {str(self.eleve)} pour l'examen {str(self.examen)}"


class PushupCategorie(models.Model):
    label = models.CharField(max_length=200, default="")
    quantite = models.IntegerField(default=10)

    def __str__(self):
        return f"{self.label} • {self.quantite} pompes"


class Pushup(models.Model):
    eleve = models.ForeignKey(Eleve, on_delete=models.PROTECT, related_name="pushups")
    categorie = models.ForeignKey(PushupCategorie, on_delete=models.PROTECT, related_name="pushups")
    dt_execute = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.eleve.prenom} • {self.categorie.label} • {self.dt_execute}"
