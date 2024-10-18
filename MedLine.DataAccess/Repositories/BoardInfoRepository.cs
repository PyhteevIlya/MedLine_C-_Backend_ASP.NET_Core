using MedLine.Core.Abstractions;
using MedLine.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace MedLine.DataAccess.Repositories
{
    public class BoardInfoRepository : IBoardInfoRepository
    {
        private readonly MedLineDbContext _context;

        public BoardInfoRepository(MedLineDbContext context)
        {
            _context = context;
        }

        public async Task<BoardInfo> Get()
        {
            var board = await _context.Boards
                .AsNoTracking()
                .SingleOrDefaultAsync();

            return board;
        }

        public async Task<BoardInfo> Create(BoardInfo board)
        {
            await _context.Boards.AddAsync(board);
            await _context.SaveChangesAsync();

            return board;
        }

        public async Task<BoardInfo> Update(Guid id, string headBoard, string textBoard, string endBoard)
        {
            var board = await _context.Boards
                .ExecuteUpdateAsync(s => s
                    .SetProperty(b => b.HeadBoard, headBoard)
                    .SetProperty(b => b.TextBoard, textBoard)
                    .SetProperty(b => b.EndBoard, endBoard));

            return new BoardInfo(id, headBoard, textBoard, endBoard);
        }

    }
}
