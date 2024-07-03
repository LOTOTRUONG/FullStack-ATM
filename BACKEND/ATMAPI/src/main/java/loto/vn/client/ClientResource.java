package loto.vn.client;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

@Path("client")
@Tag(name = "1 - Management of clients")
public class ClientResource {
    @Inject
    ClientRepository clientRepository;

    @GET
    @Operation(summary = "all clients")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(){
        List<ClientEntity> clientEntities = clientRepository.listAll();
        return Response.ok(ClientDTO.toDtoList(clientEntities)).build();
    }

    @GET
    @Path("{id}")
    @Operation(summary = "client by id")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") Integer id){
        ClientEntity clientEntity = clientRepository.findById(id);
        return Response.ok(new ClientDTO(clientEntity)).build();
    }
    @GET
    @Path("{phone}")
    @Operation(summary = "client by phone")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getByPhone(@PathParam("phone") String phone){
        ClientEntity clientEntity = clientRepository.findByPhone(phone);
        if (clientEntity == null)
            return Response.status(Response.Status.NOT_FOUND).entity("Client not found").type(MediaType.TEXT_PLAIN_TYPE).build();
        return Response.ok().build();
    }

    @POST
    @Transactional
    @Path("/login")
    public Response login(@FormParam("login") String login, @FormParam("code") Integer code){
        if (login == null || code == null)
            return Response.status(Response.Status.BAD_REQUEST).entity("Please enter the login and code").type(MediaType.TEXT_PLAIN_TYPE).build();
        ClientEntity client = clientRepository.findByPhone(login);
        if (client == null)
            return Response.status(Response.Status.NOT_FOUND).entity("Client not found").type(MediaType.TEXT_PLAIN_TYPE).build();
        if (client.getCode().equals(code))
            return Response.ok(new ClientDTO(client)).build();
        else
            return Response.status(Response.Status.FORBIDDEN).entity("Invalid code").type(MediaType.TEXT_PLAIN_TYPE).build();
    }

}
