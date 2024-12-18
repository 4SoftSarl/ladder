# Generated by Django 5.1.3 on 2024-11-18 15:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ladder', '0002_ranking'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categorie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Examen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=50)),
                ('date_creation', models.DateField(auto_now_add=True)),
                ('date_rendu', models.DateField()),
                ('description', models.TextField()),
                ('elo_max', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='ranking',
            name='color',
            field=models.CharField(default='#ffffff', max_length=10),
        ),
        migrations.CreateModel(
            name='Eleve',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=50)),
                ('prenom', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
                ('elo', models.IntegerField()),
                ('volee', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='ladder.volee')),
            ],
        ),
        migrations.CreateModel(
            name='ExamenResultat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_rendu', models.DateField()),
                ('elo', models.IntegerField()),
                ('eleve', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='ladder.eleve')),
                ('examen', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='ladder.examen')),
            ],
        ),
        migrations.CreateModel(
            name='SousCategorie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=50)),
                ('categorie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ladder.categorie')),
            ],
        ),
        migrations.AddField(
            model_name='examen',
            name='sous_categorie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='ladder.souscategorie'),
        ),
    ]
