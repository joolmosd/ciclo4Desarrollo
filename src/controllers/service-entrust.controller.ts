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
  Entrust,
} from '../models';
import {ServiceRepository} from '../repositories';

export class ServiceEntrustController {
  constructor(
    @repository(ServiceRepository)
    public serviceRepository: ServiceRepository,
  ) { }

  @get('/services/{id}/entrust', {
    responses: {
      '200': {
        description: 'Entrust belonging to Service',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Entrust)},
          },
        },
      },
    },
  })
  async getEntrust(
    @param.path.string('id') id: typeof Service.prototype.id,
  ): Promise<Entrust> {
    return this.serviceRepository.entrustFk(id);
  }
}
