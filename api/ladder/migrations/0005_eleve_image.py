# Generated by Django 5.1.3 on 2024-11-19 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ladder', '0004_alter_eleve_volee'),
    ]

    operations = [
        migrations.AddField(
            model_name='eleve',
            name='image',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='eleve/'),
        ),
    ]