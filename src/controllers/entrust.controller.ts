import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Entrust} from '../models';
import {EntrustRepository} from '../repositories';

@authenticate("admin")
export class EntrustController {
  constructor(
    @repository(EntrustRepository)
    public entrustRepository: EntrustRepository,
  ) { }

  @post('/entrusts')
  @response(200, {
    description: 'Entrust model instance',
    content: {'application/json': {schema: getModelSchemaRef(Entrust)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entrust, {
            title: 'NewEntrust',
            exclude: ['id'],
          }),
        },
      },
    })
    entrust: Omit<Entrust, 'id'>,
  ): Promise<Entrust> {
    return this.entrustRepository.create(entrust);
  }

  @get('/entrusts/count')
  @response(200, {
    description: 'Entrust model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Entrust) where?: Where<Entrust>,
  ): Promise<Count> {
    return this.entrustRepository.count(where);
  }

  @get('/entrusts')
  @response(200, {
    description: 'Array of Entrust model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Entrust, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Entrust) filter?: Filter<Entrust>,
  ): Promise<Entrust[]> {
    return this.entrustRepository.find(filter);
  }

  @patch('/entrusts')
  @response(200, {
    description: 'Entrust PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entrust, {partial: true}),
        },
      },
    })
    entrust: Entrust,
    @param.where(Entrust) where?: Where<Entrust>,
  ): Promise<Count> {
    return this.entrustRepository.updateAll(entrust, where);
  }

  @get('/entrusts/{id}')
  @response(200, {
    description: 'Entrust model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Entrust, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Entrust, {exclude: 'where'}) filter?: FilterExcludingWhere<Entrust>
  ): Promise<Entrust> {
    return this.entrustRepository.findById(id, filter);
  }

  @patch('/entrusts/{id}')
  @response(204, {
    description: 'Entrust PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entrust, {partial: true}),
        },
      },
    })
    entrust: Entrust,
  ): Promise<void> {
    await this.entrustRepository.updateById(id, entrust);
  }

  @put('/entrusts/{id}')
  @response(204, {
    description: 'Entrust PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() entrust: Entrust,
  ): Promise<void> {
    await this.entrustRepository.replaceById(id, entrust);
  }

  @del('/entrusts/{id}')
  @response(204, {
    description: 'Entrust DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.entrustRepository.deleteById(id);
  }
}
