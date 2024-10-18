using MedLine.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedLine.DataAccess.Configurations
{
    public class DoctorConfiguration : IEntityTypeConfiguration<DoctorEntity>
    {
        public void Configure(EntityTypeBuilder<DoctorEntity> builder)
        {
            builder.HasKey(x => x.Id);

            builder
                .HasMany(d => d.RecordAppointments)
                .WithOne(r => r.Doctor)
                .HasForeignKey(r => r.DoctorId);

            builder.Property(b => b.FullName)
                .IsRequired();
            builder.Property(b => b.Specialization)
                .IsRequired();
        }
    }
}
