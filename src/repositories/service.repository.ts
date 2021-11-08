import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Service, ServiceRelations, Client, Entrust} from '../models';
import {ClientRepository} from './client.repository';
import {EntrustRepository} from './entrust.repository';

export class ServiceRepository extends DefaultCrudRepository<
  Service,
  typeof Service.prototype.id,
  ServiceRelations
> {

  public readonly originFk: BelongsToAccessor<Client, typeof Service.prototype.id>;

  public readonly destinyFk: BelongsToAccessor<Client, typeof Service.prototype.id>;

  public readonly entrustFk: BelongsToAccessor<Entrust, typeof Service.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('EntrustRepository') protected entrustRepositoryGetter: Getter<EntrustRepository>,
  ) {
    super(Service, dataSource);
    this.entrustFk = this.createBelongsToAccessorFor('entrustFk', entrustRepositoryGetter,);
    this.registerInclusionResolver('entrustFk', this.entrustFk.inclusionResolver);
    this.destinyFk = this.createBelongsToAccessorFor('destinyFk', clientRepositoryGetter,);
    this.registerInclusionResolver('destinyFk', this.destinyFk.inclusionResolver);
    this.originFk = this.createBelongsToAccessorFor('originFk', clientRepositoryGetter,);
    this.registerInclusionResolver('originFk', this.originFk.inclusionResolver);
  }
}
