namespace MedLine.API.Contracts
{
    public record BoardInfoResponse(
        Guid id,
        string headBoard,
        string textBoard,
        string endBoard);
}
