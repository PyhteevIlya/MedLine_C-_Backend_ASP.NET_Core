﻿// <auto-generated />
using System;
using MedLine.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MedLine.DataAccess.Migrations
{
    [DbContext(typeof(MedLineDbContext))]
    [Migration("20240920060732_addBoardInfo")]
    partial class addBoardInfo
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MedLine.Core.Models.BoardInfo", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("EndBoard")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HeadBoard")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TextBoard")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Boards");
                });

            modelBuilder.Entity("MedLine.DataAccess.Entities.DoctorEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Specialization")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Doctors");
                });

            modelBuilder.Entity("MedLine.DataAccess.Entities.PatientEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JobPhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JobRole")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrgUnit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PersonalPhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProgramMedicalPolicy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TabelNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("MedLine.DataAccess.Entities.RecordAppointmentEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("DateAppointment")
                        .HasColumnType("date");

                    b.Property<Guid>("DoctorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsReserved")
                        .HasColumnType("bit");

                    b.Property<Guid?>("PatientId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("RoomNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<TimeOnly>("TimeAppointment")
                        .HasColumnType("time");

                    b.HasKey("Id");

                    b.HasIndex("DoctorId");

                    b.HasIndex("PatientId");

                    b.ToTable("RecordAppointments");
                });

            modelBuilder.Entity("MedLine.DataAccess.Entities.RecordAppointmentEntity", b =>
                {
                    b.HasOne("MedLine.DataAccess.Entities.DoctorEntity", "Doctor")
                        .WithMany("RecordAppointments")
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MedLine.DataAccess.Entities.PatientEntity", "Patient")
                        .WithMany("RecordAppointments")
                        .HasForeignKey("PatientId");

                    b.Navigation("Doctor");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("MedLine.DataAccess.Entities.DoctorEntity", b =>
                {
                    b.Navigation("RecordAppointments");
                });

            modelBuilder.Entity("MedLine.DataAccess.Entities.PatientEntity", b =>
                {
                    b.Navigation("RecordAppointments");
                });
#pragma warning restore 612, 618
        }
    }
}
