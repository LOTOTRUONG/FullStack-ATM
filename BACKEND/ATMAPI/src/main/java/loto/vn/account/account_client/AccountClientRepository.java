package loto.vn.account.account_client;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import loto.vn.account.account_client.AccountClientEntity;

@RequestScoped
public class AccountClientRepository implements PanacheRepositoryBase<AccountClientEntity, Integer> {

    @Inject
    EntityManager entityManager;

    public AccountClientEntity findByIdAccount(Integer idAccount){
        try {
            return (AccountClientEntity) entityManager.createNativeQuery("EXEC ViewAccountClient @idAccount = :idAccount", AccountClientEntity.class)
                    .setParameter("idAccount", idAccount)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }


    public AccountClientEntity findByAccountNumber (String accountNumber){
        try {
            return (AccountClientEntity) entityManager.createNativeQuery("EXEC ViewAccountClient @accountNumber = :accountNumber", AccountClientEntity.class)
                    .setParameter("accountNumber", accountNumber)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
