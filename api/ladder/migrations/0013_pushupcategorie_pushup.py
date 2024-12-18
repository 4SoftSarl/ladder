# Generated by Django 5.1.3 on 2024-12-10 13:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ladder', '0012_eleve_pushup'),
    ]

    operations = [
        migrations.CreateModel(
            name='PushupCategorie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(default='', max_length=200)),
                ('quantite', models.IntegerField(default=10)),
            ],
        ),
        migrations.CreateModel(
            name='Pushup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dt_execute', models.DateTimeField(auto_now_add=True)),
                ('eleve', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='pushups', to='ladder.eleve')),
                ('categorie', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='pushups', to='ladder.pushupcategorie')),
            ],
        ),
    ]
