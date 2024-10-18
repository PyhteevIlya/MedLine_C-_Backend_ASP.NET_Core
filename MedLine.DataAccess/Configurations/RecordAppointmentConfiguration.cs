using MedLine.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedLine.DataAccess.Configurations
{
    public class RecordAppointmentConfiguration : IEntityTypeConfiguration<RecordAppointmentEntity>
    {
        public void Configure(EntityTypeBuilder<RecordAppointmentEntity> builder)
        {
            builder.HasKey(x => x.Id);

            builder
               .HasOne(r => r.Doctor)
               .WithMany(d => d.RecordAppointments)
               .HasForeignKey(r => r.DoctorId);

            builder
                .HasOne(r => r.Patient)
                .WithMany(p => p.RecordAppointments)
                .HasForeignKey(r => r.PatientId);

            builder.Property(b => b.DateAppointment)
                .IsRequired();
            builder.Property(b => b.TimeAppointment)
                .IsRequired();
            builder.Property(b => b.DoctorId)
                .IsRequired();
            builder.Property(b => b.IsReserved)
                .IsRequired();
            builder.Property(b => b.Status)
                .IsRequired();
        }
    }
}
