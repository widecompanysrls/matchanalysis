from MatchAnalisys.matchanalysis.models import *
from rest_framework import serializers


class CoupleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Couple
        fields = ('id', 'name1', 'surname1', 'name2', 'surname2', 'number')


class DanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dance
        fields = ('id', 'name')


class JudgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Judge
        fields = ('id', 'name', 'surname', 'id_login')


class ParamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dance
        fields = ('id', 'name')


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Votation
        fields = ('fk_judge', 'fk_couple', 'fk_parameter', 'fk_session', 'fk_dance', 'vote')
        depth = 1


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('fk_judge', 'fk_couple', 'fk_session', 'fk_dance', 'notes')
        depth = 1


class RandomMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RandomMethod
        fields = ('fk_judge', 'fk_session', 'fk_dance', 'fk_paramether')
        depth = 1


class ActiveJudgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveJudges
        fields = ('fk_session', 'fk_judge', 'active')
        depth = 1


class StartSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StartSession
        fields = ('fk_session', 'start')
        depth = 1
