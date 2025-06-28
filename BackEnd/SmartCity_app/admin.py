from django.contrib import admin
from .models import Usuario, Ambientes, Sensores, Historico
from django.contrib.auth.admin import UserAdmin

# Register your models here.

class UsuarioAdmin(UserAdmin): 
    #Adicionando novos campos para o usuário
    fieldsets = UserAdmin.fieldsets + (
        ('Função do usuário', {"fields": ("funcao",)}),
    ) 
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Função do usuário, novamente", {"fields": ("funcao",)}),
    )

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Ambientes)
admin.site.register(Sensores)
admin.site.register(Historico)