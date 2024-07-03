package loto.vn.operation;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import loto.vn.account.AccountEntity;
import loto.vn.operation.type.TypeOperationEntity;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Path("operation")
@Tag(name = "3 - Management of operations")
public class OperationResource {
    @Inject
    OperationRepository operationRepository;

    @Transactional
    @Path("{idAccount}")
    @POST
    @Operation
    public Response insert(@PathParam("idAccount") Integer idAccount,
                           @FormParam("id_type") Integer id_type,
                           @FormParam("amount") Float amount){
        OperationEntity operation = new OperationEntity();
        operation.setAccountOperation(new AccountEntity(idAccount));
        operation.setTypeOperation(new TypeOperationEntity(id_type));
        operation.setDateOperation(Date.valueOf(LocalDate.now()));
        operation.setAmountOperation(amount);
        operationRepository.persist(operation);
        return Response.status(200).build();
    }

    @Transactional
    @Path("withdraw/{idAccount}")
    @POST
    @Operation
    public Response withdraw(@PathParam("idAccount") Integer idAccount,
                           @FormParam("amount") Float amount){
        OperationEntity operation = new OperationEntity();
        operation.setAccountOperation(new AccountEntity(idAccount));
        operation.setTypeOperation(new TypeOperationEntity(2));
        operation.setDateOperation(Date.valueOf(LocalDate.now()));
        operation.setAmountOperation(amount);
        operationRepository.persist(operation);
        return Response.status(200).build();
    }

    @Transactional
    @Path("deposite/{idAccount}")
    @POST
    @Operation
    public Response deposite(@PathParam("idAccount") Integer idAccount,
                             @FormParam("amount") Float amount){
        OperationEntity operation = new OperationEntity();
        operation.setAccountOperation(new AccountEntity(idAccount));
        operation.setTypeOperation(new TypeOperationEntity(1));
        operation.setDateOperation(Date.valueOf(LocalDate.now()));
        operation.setAmountOperation(amount);
        operationRepository.persist(operation);
        return Response.status(200).build();
    }

}
