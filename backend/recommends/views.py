from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

import numpy as np
from scipy.sparse import csr_matrix

from .models import Taste
from accounts.models import User
from cities.models import City, Visit

from cities.serializers import Visit_serializer

from .recommend import knn_recommend
# Create your views here.

@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def sel_city(request):
    '''
    GET : 본인이 다녀온 지역 확인
    POST : 새로운 지역에 대한 평점 추가
    '''
    user = request.user
    if request.method == "GET":
        visits = get_list_or_404(Visit, user_id = user.id)
        serializer = Visit_serializer(visits, many=True)
        return Response(data=serializer.data)

    elif request.method == "POST":
        city_id = request.data.get("city")

        if not user.rate_cities.filter(pk=city_id).exists():
            serializer = Visit_serializer(data=request.data)
        else:
            visit = get_object_or_404(Visit, user_id=user.id, city_id=city_id)
            if not request.data.get('rate'):
                visit.delete()
                return Response(status=status.HTTP_205_RESET_CONTENT)
            serializer = Visit_serializer(instance=visit, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)























