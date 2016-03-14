from field import Field

class Step(object):
    id = 0

    def __init__(self, order, name):
        self.name = name
        self.info_text = ""
        self.fields = []
        self.order = order

        self.id = Step.id
        Step.id += 1

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
            'order': self.order
        }
