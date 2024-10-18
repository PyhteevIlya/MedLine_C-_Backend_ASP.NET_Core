using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedLine.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addRoomNumberOnRecordAppointment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoomNumber",
                table: "RecordAppointments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoomNumber",
                table: "RecordAppointments");
        }
    }
}
