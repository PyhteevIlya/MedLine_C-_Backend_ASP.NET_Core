using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedLine.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class SecondMihration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "PatientId",
                table: "RecordAppointments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "RecordAppointments",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<bool>(
                name: "IsReserved",
                table: "RecordAppointments",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "TypeAppointment",
                table: "RecordAppointments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Doctors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Specialization = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doctors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonalPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TabelNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrgUnit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JobRole = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProgramMedicalPolicy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DoctorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DateTimeForRecordStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateTimeForRecordEnd = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Schedules_Doctors_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doctors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RecordAppointments_DoctorId",
                table: "RecordAppointments",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_RecordAppointments_PatientId",
                table: "RecordAppointments",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_DoctorId",
                table: "Schedules",
                column: "DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK_RecordAppointments_Doctors_DoctorId",
                table: "RecordAppointments",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecordAppointments_Patients_PatientId",
                table: "RecordAppointments",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecordAppointments_Doctors_DoctorId",
                table: "RecordAppointments");

            migrationBuilder.DropForeignKey(
                name: "FK_RecordAppointments_Patients_PatientId",
                table: "RecordAppointments");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_RecordAppointments_DoctorId",
                table: "RecordAppointments");

            migrationBuilder.DropIndex(
                name: "IX_RecordAppointments_PatientId",
                table: "RecordAppointments");

            migrationBuilder.DropColumn(
                name: "IsReserved",
                table: "RecordAppointments");

            migrationBuilder.DropColumn(
                name: "TypeAppointment",
                table: "RecordAppointments");

            migrationBuilder.AlterColumn<Guid>(
                name: "PatientId",
                table: "RecordAppointments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "RecordAppointments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
