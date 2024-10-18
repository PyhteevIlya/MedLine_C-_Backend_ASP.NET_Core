namespace MedLine.Core.Models
{
    public class BoardInfo
    {
        public BoardInfo(Guid id, string headBoard, string textBoard, string endBoard)
        {
            Id = id;
            HeadBoard = headBoard;
            TextBoard = textBoard;
            EndBoard = endBoard;
        }
        public Guid Id { get; set; }
        public string HeadBoard { get; set; }
        public string TextBoard { get; set; }
        public string EndBoard { get; set; }
    }
}
