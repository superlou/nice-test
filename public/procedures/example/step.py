from field import Field

class Step(object):
    id = 0
    all = []

    def __init__(self, name):
        self.name = name
        self.info_text = ""
        self.fields = []

        self.id = Step.id
        Step.id += 1
        Step.all.append(self)

    def info(self, text):
        self.info_text = text

    def field(self, text, **kwargs):
        field = Field(text, self, **kwargs)
        self.fields.append(field)

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'infoText': self.info_text,
            'fields': [field.id for field in self.fields],
        }
