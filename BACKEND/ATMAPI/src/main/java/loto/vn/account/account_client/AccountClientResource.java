package loto.vn.account.account_client;

import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import loto.vn.account.AccountCheckDTO;
import loto.vn.security.TokenManager;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/account")
@Tag(name = "2 - Gestion des accounts")
public class AccountClientResource {
    @Inject
    AccountClientRepository accountClientRepository;

    @GET
    @Path("{id}")
    @Operation(summary = "account by id")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") Integer id){
        AccountClientEntity account = accountClientRepository.findByIdAccount(id);
        return Response.ok(new AccountClientDTO(account)).build();
    }

    @GET
    @Path("/balance/{idAccount}")
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response getAccountBalancesById(@PathParam("idAccount") Integer idAccount) {
        AccountClientEntity account = accountClientRepository.findByIdAccount(idAccount);
        if (account == null)
            return Response.status(Response.Status.NOT_FOUND).entity("Account not found").type(MediaType.TEXT_PLAIN_TYPE).build();
        return Response.ok().entity(account.getBalanceAccount()).build();
    }

    @GET
    @Path("/accountNumber/{number}")
    @Operation(summary = "account by number")
    public Response getByAccountNumber(@PathParam("number") String number){
        AccountClientEntity account = accountClientRepository.findByAccountNumber(number);
        if (account == null)
            return Response.status(Response.Status.NOT_FOUND).entity("Account not found").type(MediaType.TEXT_PLAIN_TYPE).build();
        return Response.ok().build();

    }



    @POST
    @Transactional
    @Path("login")
    public Response login(@FormParam("login") String login, @FormParam("code") String code){
        if (login == null || code == null)
            return Response.status(Response.Status.BAD_REQUEST).entity("Please enter the number of account and code").type(MediaType.TEXT_PLAIN_TYPE).build();
        AccountClientEntity account = accountClientRepository.findByAccountNumber(login);
        if (account == null)
            return Response.status(Response.Status.NOT_FOUND).entity("Account not found").type(MediaType.TEXT_PLAIN_TYPE).build();
        if (!account.getCode().equals(code)) {
            return Response.status(Response.Status.FORBIDDEN)
                    .entity("Invalid code")
                    .type(MediaType.TEXT_PLAIN_TYPE)
                    .build();
        }
        String token = TokenManager.generateToken(account.getIdAccount().toString());
        return Response.ok(token).type(MediaType.TEXT_PLAIN_TYPE).build();
    }
}
