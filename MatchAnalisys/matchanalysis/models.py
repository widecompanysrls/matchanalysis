from django.db import models


class DbSession(models.Model):
    id = models.CharField(max_length=150, primary_key=True)
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)


class Dance(models.Model):
    name = models.CharField(max_length=50)
    fk_session = models.CharField(max_length=150)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'fk_session'], name='Constraint_Dance')
        ]


class Judge(models.Model):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    fk_session = models.CharField(max_length=150)
    id_login = models.CharField(max_length=50)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'surname', 'fk_session'], name='Constraint_Judge'),
            models.UniqueConstraint(fields=['fk_session', 'id_login'], name='Constraint_Judge2')
        ]


class Paramether(models.Model):
    name = models.CharField(max_length=50)
    fk_session = models.CharField(max_length=150)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'fk_session'], name='Constraint_Paramether')
        ]


class Couple(models.Model):
    name1 = models.CharField(max_length=50)
    surname1 = models.CharField(max_length=50)
    name2 = models.CharField(max_length=50)
    surname2 = models.CharField(max_length=50)
    number = models.IntegerField(null=False, default=0)
    fk_session = models.CharField(max_length=150)
    email = models.CharField(max_length=150, null=False, default='a@b.it')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['number', 'fk_session'],
                                    name='Constraint_Couple'),
            models.UniqueConstraint(fields=['email', 'fk_session'],
                                    name='Constraint_Couple2')
        ]


class Votation(models.Model):
    fk_judge = models.ForeignKey(Judge, related_name='judge_v', on_delete=models.CASCADE)
    fk_dance = models.ForeignKey(Dance, related_name='dance_v', on_delete=models.CASCADE)
    fk_parameter = models.ForeignKey(Paramether, related_name='param_v', on_delete=models.CASCADE)
    fk_couple = models.ForeignKey(Couple, related_name='couple_v', on_delete=models.CASCADE)
    fk_session = models.ForeignKey(DbSession, related_name='dbsession_v', on_delete=models.CASCADE)
    vote = models.FloatField()

    def __str__(self):
        return '%d: %s' % (self.vote, self.fk_dance)


class Note(models.Model):
    notes = models.CharField(max_length=1600)
    fk_judge = models.ForeignKey(Judge, related_name='judge_n', on_delete=models.CASCADE)
    fk_dance = models.ForeignKey(Dance, related_name='dance_n', on_delete=models.CASCADE)
    fk_couple = models.ForeignKey(Couple, related_name='couple_n', on_delete=models.CASCADE)
    fk_session = models.ForeignKey(DbSession, related_name='dbsession_n', on_delete=models.CASCADE)


class RandomMethod(models.Model):
    fk_session = models.ForeignKey(DbSession, related_name='dbsession_r', on_delete=models.CASCADE)
    fk_judge = models.ForeignKey(Judge, related_name='judge_r', on_delete=models.CASCADE)
    fk_dance = models.ForeignKey(Dance, related_name='dance_r', on_delete=models.CASCADE, default=0)
    fk_paramether = models.ForeignKey(Paramether, related_name='param_r', on_delete=models.CASCADE, default=0)


class ActiveJudges(models.Model):
    fk_session = models.ForeignKey(DbSession, related_name='dbsession_aj', on_delete=models.CASCADE)
    fk_judge = models.ForeignKey(Judge, related_name='judge_aj', on_delete=models.CASCADE)
    active = models.IntegerField(default=0)


class StartSession(models.Model):
    fk_session = models.ForeignKey(DbSession, related_name='dbsession_ss', on_delete=models.CASCADE)
    start = models.IntegerField(default=0)
