from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

# Create your models here.

class Usuario(AbstractUser): #Classe do usuário personalizado
    cargo = [
        ("Administrador", "Administrador"),
        ("Professor", "Professor"),
    ]
    funcao = models.CharField(max_length=30, choices=cargo, default="Professor")

    def __str__(self):
        return self.username

class Ambientes(models.Model): #Tabela de ambientes

    validacao_sig = RegexValidator( #Validação do sig (créditos: Nícolas Duarte Silva (Nico) 😉)
        regex=r'^[0-9]{8}$',
        message="O sig tem que possuir 8 dígitos.",
    )

    sig = models.IntegerField(validators=[validacao_sig])
    descricao = models.TextField()
    ni = models.CharField(max_length=20)
    responsavel = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "Ambientes"

class Sensores(models.Model): #Tabela de sensores
    escolha_sensor = [
        ("Temperatura", "Temperatura"),
        ("Umidade", "Umidade"),
        ("Luminosidade", "Luminosidade"),
        ("Contagem", "Contagem"),
    ]

    escolha_unidade_medida = [
        ("°C", "°C"),
        ("%", "%"),
        ("lux", "lux"),
        ("uni", "uni"),
    ]

    validacao_mac_address = RegexValidator( #Validação do mac address (créditos: Nícolas Duarte Silva (Nico) 😉)
        regex=r'([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
        message="Formato inválido. Exemplo de formato: 00:1A:2B:3C:4D:5E",
    )

    sensor = models.CharField(max_length=30, choices=escolha_sensor, default="Temperatura")
    mac_address = models.CharField(max_length=50, validators=[validacao_mac_address])
    unidade_med = models.CharField(max_length=20, choices=escolha_unidade_medida, default="°C")
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.sensor

    class Meta:
        verbose_name_plural = "Sensores"

class Historico(models.Model): #Tabela de históricos
    sensor = models.ForeignKey('Sensores', on_delete=models.CASCADE)
    ambiente = models.ForeignKey('Ambientes', on_delete=models.CASCADE)
    valor = models.FloatField()
    timestamp = models.DateTimeField()

    def __str__(self):
        return self.sensor - self.ambiente