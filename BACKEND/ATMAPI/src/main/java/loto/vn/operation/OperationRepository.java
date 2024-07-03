package loto.vn.operation;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class OperationRepository implements PanacheRepositoryBase<OperationEntity, Integer> {

}
