package loto.vn.client;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class ClientRepository implements PanacheRepositoryBase<ClientEntity, Integer> {
    public ClientEntity findByPhone(String phone){
        return find("phone", phone).firstResult();
    }
}
