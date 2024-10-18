using MedLine.API.Contracts;
using MedLine.Core.Abstractions;
using MedLine.Core.Models;
using MedLine.Core.Models.Enum;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;

namespace MedLine.API.Controllers
{
    [Authorize(Policy = "Пользователь")]
    [ApiController]
    [Route("[controller]")]
    public class BoardInfoController : ControllerBase
    {
        private readonly IBoardInfoRepository _boardInfoRepository;

        public BoardInfoController(IBoardInfoRepository boardInfoRepository)
        {
            _boardInfoRepository = boardInfoRepository;
        }

        [HttpGet(nameof(GetBoard))]
        public async Task<ActionResult<BoardInfo>> GetBoard()
        {
            var board= await _boardInfoRepository.Get();
            if (board == null) return Empty;
            var response = new BoardInfoResponse(board.Id, board.HeadBoard, board.TextBoard, board.EndBoard);
            return Ok(response);
        }

        [HttpPost(nameof(CreateBoard))]
        public async Task<IActionResult> CreateBoard(BoardInfoRequest request)
        {
            var board = new BoardInfo(
                Guid.NewGuid(), 
                request.headBoard,
                request.textBoard,
                request.endBoard);

            var boardInfo = await _boardInfoRepository.Create(board);
            return Ok(boardInfo);
        }

        [HttpPut("UpdateBoard/{id:guid}")]
        public async Task<IActionResult> UpdateBoard(Guid id, [FromBody] BoardInfoRequest request)
        {
            var board = await _boardInfoRepository.Update(id, request.headBoard, request.textBoard, request.endBoard);
            return Ok();
        }
    }
}
