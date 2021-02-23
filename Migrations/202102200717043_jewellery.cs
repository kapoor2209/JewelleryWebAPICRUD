namespace JewelleryWebAPICRUD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jewellery : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Jewelleries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        Metal = c.String(),
                        Price = c.Double(nullable: false),
                        IsGemsFitted = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Jewelleries");
        }
    }
}
