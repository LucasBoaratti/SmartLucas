# Generated by Django 5.2.2 on 2025-06-15 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SmartCity_app', '0005_delete_usuariocadastrado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensores',
            name='sensor',
            field=models.CharField(choices=[('Temperatura', 'Temperatura'), ('Umidade', 'Umidade'), ('Luminosidade', 'Luminosidade'), ('Contagem', 'Contagem')], default='Temperatura', max_length=30),
        ),
        migrations.AlterField(
            model_name='sensores',
            name='status',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='sensores',
            name='unidade_med',
            field=models.CharField(choices=[('°C', '°C'), ('%', '%'), ('lux', 'lux'), ('uni', 'uni')], default='°C', max_length=20),
        ),
    ]
