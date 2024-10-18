using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedLine.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addBoardInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Boards",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HeadBoard = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TextBoard = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndBoard = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boards", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Boards");
        }
    }
}
