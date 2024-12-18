# Generated by Django 5.1.3 on 2024-11-18 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ladder', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ranking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=50)),
                ('elo_min', models.IntegerField()),
                ('elo_max', models.IntegerField()),
                ('image', models.ImageField(upload_to='ranking/')),
            ],
        ),
    ]
