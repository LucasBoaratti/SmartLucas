from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.views import APIView
from .models import Ambientes, Sensores, Historico, Usuario
from .serializers import AmbientesSerializer, SensoresSerializer, HistoricoSerializer, LoginUsuario, UsuarioCadastradoSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import serializers
from datetime import date, datetime
from .permissions import IsAdministrador
import pandas as pd
import os

# Create your views here.

class Login(TokenObtainPairView): #Classe de login com token JWT
    serializer_class = LoginUsuario

class AmbientesLCAPIView(ListCreateAPIView): #Classe de listar e criar ambientes
    queryset = Ambientes.objects.all()

    serializer_class = AmbientesSerializer

    permission_classes = [IsAuthenticated]

class AmbientesRUDAPIView(RetrieveUpdateDestroyAPIView): #Classe de atualizar e deletar ambientes
    queryset = Ambientes.objects.all() 

    serializer_class = AmbientesSerializer 

    permission_classes = [IsAuthenticated]

    lookup_field = "pk"

class SensoresLCAPIView(ListCreateAPIView): #Classe de criar e listar sensores
    queryset = Sensores.objects.all()

    serializer_class = SensoresSerializer

    permission_classes = [IsAuthenticated]

class SensoresRUDAPIView(RetrieveUpdateDestroyAPIView): #Classe de atualizar e deletar sensores
    queryset = Sensores.objects.all()

    serializer_class = SensoresSerializer

    permission_classes = [IsAuthenticated]

    lookup_field = "pk"

class HistoricoLCAPIView(ListCreateAPIView): #Classe de listar e criar históricos
    queryset = Historico.objects.all()

    serializer_class = HistoricoSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer): #Função de validação de valor e data do histórico
        valor = serializer.validated_data.get("valor")
        timeStamp = serializer.validated_data.get("timestamp")

        if valor < 0:
            raise serializers.ValidationError("O valor do sensor não pode ser negativo.")
        
        if timeStamp.date() > date.today():
            raise serializers.ValidationError("A data do sensor não pode ser superior a data de hoje.")
        
        serializer.save()

class HistoricoRUDAPIView(RetrieveUpdateDestroyAPIView): #Classe de atualizar e deletar histórico
    queryset = Historico.objects.all()

    serializer_class = HistoricoSerializer

    permission_classes = [IsAuthenticated]

    lookup_field = "pk"

    def perform_create(self, serializer): #Função de validação de valor e data do histórico
        valor = serializer.validated_data.get("valor")
        timeStamp = serializer.validated_data.get("timestamp")

        if valor < 0:
            raise serializers.ValidationError("O valor do sensor não pode ser negativo.")
        
        if timeStamp.date() > date.today():
            raise serializers.ValidationError("A data do sensor não podem ser superior a data de hoje.")
        
        serializer.save()

class BuscarSensor(APIView): #APIView permite criar endpoints personalizados com GET, POST etc.
    permission_classes = [IsAuthenticated]

    def post(self, request): 
        sensor = request.data.get("sensor") #Buscando o sensor no banco de dados

        if not sensor: #Verificando se o sensor não existe
            return Response({"Erro": "Sensor não encontrado."}, status=400)

        sensores = Sensores.objects.filter(sensor__icontains=sensor) #Consultando na tabela de sensores, os dados que contenha a palavra digitada pelo usuário | icontains: permite busca sem diferenciar letras maiúsculas/minúsculas

        serializerJSON = SensoresSerializer(sensores, many=True) #Transformando os dados em JSON

        return Response(serializerJSON.data) #Retornando os sensores encontrados para o usuário
    
class BuscarStatusSensor(APIView): #Classe que filtra o status do sensor pedido pelo usuário
    permission_classes = [IsAuthenticated]

    def post(self, request):
        status = request.data.get("status")

        if not status:
            return Response({"Erro": "Status do sensor não encontrado."}, status=400)
        
        opcoesStatus = status.lower() == "true" #Transformando um campo booleano em string

        statusSensores = Sensores.objects.filter(status=opcoesStatus)

        serializerJSON = SensoresSerializer(statusSensores, many=True)

        return Response(serializerJSON.data)
    
class AtualizarStatusSensor(UpdateAPIView): #Classe que atualiza o status de um sensor
    queryset = Sensores.objects.all()

    serializer_class = SensoresSerializer

    permission_classes = [IsAuthenticated]

    lookup_field = "pk"

class VerSensoresTemperaturaRegistrados(APIView): #Classe que busca um sensor de temperatura pela data digitada por um usuário admin
    permission_classes = [IsAdministrador]

    def post(self, request):
        arquivo = os.path.join(os.getcwd(), "temperatura.xlsx") #Buscando o local do arquivo excel

        arquivoExcel = pd.read_excel(arquivo)

        timestamp = request.data.get("timestamp")

        if not timestamp:
            return Response({"Erro": "Data e hora não encontradas."}, status=400)
        
        try:
            formatoData = datetime.strptime(timestamp, "%Y-%m-%d")
        except (ValueError, TypeError):
            return Response({"Erro": "Data com formato inválido. Formato esperado: AAAA-MM-DD"}, status=400)
        
        arquivoExcel["timestamp"] = pd.to_datetime(arquivoExcel["timestamp"], errors="coerce")

        dataTemperatura = arquivoExcel.loc[arquivoExcel["timestamp"].dt.date == formatoData.date()]

        if dataTemperatura.empty:
            return Response({"Erro": "Nenhum sensor encontrado com essa data."}, status=404)
    
        return Response(dataTemperatura.to_dict(orient="records"), status=200)
    
class UsuarioCadastradoLCAPIView(ListCreateAPIView): #Classe de um usuário cadastrado
    queryset = Usuario.objects.all()

    serializer_class = UsuarioCadastradoSerializer

    permission_classes = [AllowAny]

class VerSensoresContagemRegistrados(APIView): #Classe que busca um sensor de contagem pela data digitada por um usuário admin
    permission_classes = [IsAdministrador]

    def post(self, request):
        arquivo = os.path.join(os.getcwd(), "contador.xlsx") #Buscando o local do arquivo excel

        arquivoExcel = pd.read_excel(arquivo)

        timestamp = request.data.get("timestamp")

        if not timestamp:
            return Response({"Erro": "Data e hora não encontradas."}, status=400)
        
        try:
            formatoData = datetime.strptime(timestamp, "%Y-%m-%d")
        except (ValueError, TypeError):
            return Response({"Erro": "Data com formato inválido. Formato esperado: AAAA-MM-DD"}, status=400)
        
        arquivoExcel["timestamp"] = pd.to_datetime(arquivoExcel["timestamp"], errors="coerce")

        dataTemperatura = arquivoExcel.loc[arquivoExcel["timestamp"].dt.date == formatoData.date()]

        if dataTemperatura.empty:
            return Response({"Erro": "Nenhum sensor encontrado com essa data."}, status=404)
    
        return Response(dataTemperatura.to_dict(orient="records"), status=200)
    
class VerSensoresLuminosidadeRegistrados(APIView): #Classe que busca um sensor de luminosidade pela data digitada por um usuário admin
    permission_classes = [IsAdministrador]

    def post(self, request):
        arquivo = os.path.join(os.getcwd(), "luminosidade.xlsx") #Buscando o local do arquivo excel
 
        arquivoExcel = pd.read_excel(arquivo)

        timestamp = request.data.get("timestamp")

        if not timestamp:
            return Response({"Erro": "Data e hora não encontradas."}, status=400)
        
        try:
            formatoData = datetime.strptime(timestamp, "%Y-%m-%d")
        except (ValueError, TypeError):
            return Response({"Erro": "Data com formato inválido. Formato esperado: AAAA-MM-DD"}, status=400)
        
        arquivoExcel["timestamp"] = pd.to_datetime(arquivoExcel["timestamp"], errors="coerce")

        dataTemperatura = arquivoExcel.loc[arquivoExcel["timestamp"].dt.date == formatoData.date()]

        if dataTemperatura.empty:
            return Response({"Erro": "Nenhum sensor encontrado com essa data."}, status=404)
    
        return Response(dataTemperatura.to_dict(orient="records"), status=200)
    
class VerSensoresUmidadeRegistrados(APIView): #Classe que busca um sensor de luminosidade pela data digitada por um usuário admin
    permission_classes = [IsAdministrador]

    def post(self, request):
        arquivo = os.path.join(os.getcwd(), "umidade.xlsx") #Buscando o local do arquivo excel
 
        arquivoExcel = pd.read_excel(arquivo)

        timestamp = request.data.get("timestamp")

        if not timestamp:
            return Response({"Erro": "Data e hora não encontradas."}, status=400)
        
        try:
            formatoData = datetime.strptime(timestamp, "%Y-%m-%d")
        except (ValueError, TypeError):
            return Response({"Erro": "Data com formato inválido. Formato esperado: AAAA-MM-DD"}, status=400)
        
        arquivoExcel["timestamp"] = pd.to_datetime(arquivoExcel["timestamp"], errors="coerce")

        dataTemperatura = arquivoExcel.loc[arquivoExcel["timestamp"].dt.date == formatoData.date()]

        if dataTemperatura.empty:
            return Response({"Erro": "Nenhum sensor encontrado com essa data."}, status=404)
    
        return Response(dataTemperatura.to_dict(orient="records"), status=200)