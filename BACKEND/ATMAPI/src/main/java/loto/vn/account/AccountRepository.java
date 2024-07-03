package loto.vn.account;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;

@RequestScoped
public class AccountRepository implements PanacheRepositoryBase<AccountEntity, Integer> {

    @Inject
    EntityManager entityManager;

    public AccountCheckDTO checkBalanceOfAccount(Integer idAccount) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("checkBalanceofAccount");
        query.registerStoredProcedureParameter("idAccount", Integer.class, ParameterMode.IN );
        query.setParameter("idAccount", idAccount);
        query.execute();
        Object[] result = (Object[]) query.getSingleResult();

        Integer accountId = (Integer) result[0];
        String phone = (String) result[1];
        Float balanceAccount = ((Number) result[2]).floatValue();
        return new AccountCheckDTO(accountId, phone,balanceAccount);
    }

    public AccountEntity findByAccountNumber(String accountNumber) {
        return find("accountNumber", accountNumber).firstResult();
    }
}
