import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Service,
  Client,
} from '../models';
import {ServiceRepository} from '../repositories';

export class ServiceClientController {
  constructor(
    @repository(ServiceRepository)
    public serviceRepository: ServiceRepository,
  ) { }

  @get('/services/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to Service',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Client)},
          },
        },
      },
    },
  })
  async getClient(
    @param.path.string('id') id: typeof Service.prototype.id,
  ): Promise<Client> {
    return this.serviceRepository.destinyFk(id);
  }
}
