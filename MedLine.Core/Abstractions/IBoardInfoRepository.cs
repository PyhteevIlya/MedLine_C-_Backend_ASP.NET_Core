using MedLine.Core.Models;

namespace MedLine.Core.Abstractions;

public interface IBoardInfoRepository
{
    Task<BoardInfo> Get();
    Task<BoardInfo> Create(BoardInfo board);
    Task<BoardInfo> Update(Guid id, string headBoard, string textBoard, string endBoard);
}