class Field(object):
    id = 0
    all = []

    def __init__(self, name, step, **kwargs):
        self.name = name
        self.field_type = kwargs.pop('type', 'check')
        self.step = step

        self.id = Field.id
        Field.id += 1
        Field.all.append(self)

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'fieldType': self.field_type,
            'stepId': self.step.id
        }
