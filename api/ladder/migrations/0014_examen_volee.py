# Generated by Django 5.1.3 on 2024-12-11 08:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ladder', '0013_pushupcategorie_pushup'),
    ]

    operations = [
        migrations.AddField(
            model_name='examen',
            name='volee',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='examens', to='ladder.volee'),
        ),
    ]
