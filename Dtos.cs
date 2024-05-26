namespace feladat3.Models
{
    public record CreateVersenyzok(int Id, string Nev, int OrszagId, string Nem);
    public record UpdateVersenyzok(int Id, string Nev, int OrszagId, string Nem);

    public record DeleteVersenyzok(int Id);


}
