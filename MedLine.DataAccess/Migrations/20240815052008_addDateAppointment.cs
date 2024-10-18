using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedLine.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addDateAppointment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeAppoinment",
                table: "RecordAppointments");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DateAppointment",
                table: "RecordAppointments",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "TimeAppointment",
                table: "RecordAppointments",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateAppointment",
                table: "RecordAppointments");

            migrationBuilder.DropColumn(
                name: "TimeAppointment",
                table: "RecordAppointments");

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeAppoinment",
                table: "RecordAppointments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
