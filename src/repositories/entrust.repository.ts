import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Entrust, EntrustRelations} from '../models';

export class EntrustRepository extends DefaultCrudRepository<
  Entrust,
  typeof Entrust.prototype.id,
  EntrustRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Entrust, dataSource);
  }
}
