using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedLine.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusToRecord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "RecordAppointments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "RecordAppointments");
        }
    }
}
