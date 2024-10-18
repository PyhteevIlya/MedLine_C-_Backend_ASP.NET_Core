using MedLine.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedLine.DataAccess.Configurations
{
    public class PatientConfiguration : IEntityTypeConfiguration<PatientEntity>
    {
        public void Configure(EntityTypeBuilder<PatientEntity> builder)
        {
            builder.HasKey(x => x.Id);

            builder
                .HasMany(p => p.RecordAppointments)
                .WithOne(r => r.Patient)
                .HasForeignKey(r => r.PatientId);

            builder.Property(b => b.FullName)
                .IsRequired();
            builder.Property(b => b.TabelNumber)
                .IsRequired();
            builder.Property(b => b.OrgUnit)
                .IsRequired();
        }
    }
}
