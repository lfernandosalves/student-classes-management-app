import { Test } from '@nestjs/testing'
import { ClassRepositoryMock } from '../../../../test/unit/mockery/class.mock'
import { ListClassesUseCase } from '../../../../src/use-cases/class/list-classes.use-case'
import { CLASS_REPOSITORY_KEY } from '../../../../src/domain/class'

describe('List Classes Use Case', () => {
  let listClassesUseCase: ListClassesUseCase
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        ListClassesUseCase,
        {
          provide: CLASS_REPOSITORY_KEY,
          useClass: ClassRepositoryMock
        }
      ]
    }).compile()

    listClassesUseCase = moduleRef.get<ListClassesUseCase>(ListClassesUseCase)
  })

  it('should return valid list of classes', async () => {
    const classes = await listClassesUseCase.execute()
    expect(classes.length).toBe(1)
    expect(classes[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      startDate: expect.any(Date),
      endDate: expect.any(Date),
      course: null,
      lessons: [],
      students: []
    })
  })
})
