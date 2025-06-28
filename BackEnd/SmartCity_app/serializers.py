from rest_framework import serializers
from .models import Ambientes, Sensores, Historico, Usuario
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UsuarioSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Usuario

        fields = "__all__"

class AmbientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambientes

        fields = "__all__"

class SensoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensores

        fields = "__all__"

class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historico

        fields = "__all__"

class UsuarioCadastradoSerializer(serializers.ModelSerializer): #Criando a classe para o usuário cadastrado     
    username = serializers.CharField(write_only=True)
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    confirmarSenha = serializers.CharField(write_only=True)
    funcao = serializers.ChoiceField(choices=[("Administrador, Administrador"), ("Professor", "Professor")])

    class Meta:
        model = Usuario

        fields = ["username", "email", "password", "confirmarSenha", "funcao"] #Passando os campos para cadastro do usuário

        extra_kwargs = {
            "password": {"write_only": True},
        }

    def validate(self, data): #Validação das senhas
        if data["password"] != data["confirmarSenha"]:
            raise serializers.ValidationError("As senhas não coincidem.")
        return data

    def create(self, validated_data): #Criando o novo usuário e salvando no banco de dados
        username = validated_data["username"]
        email = validated_data["email"]
        password = validated_data["password"]
        funcao = validated_data["funcao"]

        usuario = Usuario(
            username=username,
            email=email,
            password=password,
            funcao=funcao,
        )

        usuario.set_password(validated_data["password"])

        usuario.save()

        return usuario

class LoginUsuario(TokenObtainPairSerializer): #Coloca o nome e a função do usuário juntamente com o access token e o refresh_token
    def validate(self, attrs):
        data = super().validate(attrs)

        data["usuario"] = {
            "Nome": self.user.username,
            "Função": self.user.funcao,
        }

        return data