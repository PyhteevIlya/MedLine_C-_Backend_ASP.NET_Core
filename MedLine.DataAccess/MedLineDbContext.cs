using MedLine.Core.Models;
using MedLine.DataAccess.Configurations;
using MedLine.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace MedLine.DataAccess
{
    public class MedLineDbContext(DbContextOptions<MedLineDbContext> options) : DbContext(options)
    {
        public DbSet<RecordAppointmentEntity> RecordAppointments { get; set; }
        public DbSet<DoctorEntity> Doctors { get; set; }
        public DbSet<PatientEntity> Patients { get; set; }
        public DbSet<BoardInfo> Boards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new RecordAppointmentConfiguration());
            modelBuilder.ApplyConfiguration(new DoctorConfiguration());
            modelBuilder.ApplyConfiguration(new PatientConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}
